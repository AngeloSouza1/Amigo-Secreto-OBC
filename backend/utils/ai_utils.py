import google.generativeai as genai
import os
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup

# Carregar a chave da API Gemini
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def recomendar_presentes(preferences):
    """
    Gera recomendações de presentes com base nas preferências do usuário
    e inclui links relevantes para compra na Amazon e Mercado Livre.
    """
    try:
        # Solicitação à IA Gemini para gerar recomendações
        model = genai.GenerativeModel("gemini-pro")
        prompt = f"Recomende alguns presentes criativos para alguém que gosta de {preferences}."
        response = model.generate_content(prompt)
        recommendations = response.text.strip().split('\n')
        
        # Limitar a quantidade de recomendações a 3
        recommendations = [rec.strip() for rec in recommendations if rec.strip()][:3]

        # Buscar links para as recomendações em sites de e-commerce
        recommendations_with_links = []
        for rec in recommendations:
            amazon_link = buscar_link_amazon(rec)
            mercado_livre_link = buscar_link_mercado_livre(rec)
            recommendations_with_links.append(
                f"{rec}\n- Amazon: {amazon_link}\n- Mercado Livre: {mercado_livre_link}\n"
            )

        return '\n'.join(recommendations_with_links)

    except Exception as e:
        return f"Erro ao gerar recomendação: {str(e)}"


def buscar_link_amazon(produto):
    """
    Busca um link de compra para o produto especificado no site da Amazon Brasil.
    """
    try:
        query = produto.replace(' ', '+')
        url = f"https://www.amazon.com.br/s?k={query}"
        headers = {"User-Agent": "Mozilla/5.0"}

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return "Link da Amazon não encontrado"

        soup = BeautifulSoup(response.text, 'html.parser')
        first_result = soup.find('a', class_='a-link-normal', href=True)
        if first_result:
            link = "https://www.amazon.com.br" + first_result['href']
            return link

        return "Link da Amazon não encontrado"

    except Exception:
        return "Erro ao buscar link na Amazon"


def buscar_link_mercado_livre(produto):
    """
    Busca um link de compra para o produto especificado no site do Mercado Livre.
    """
    try:
        query = produto.replace(' ', '-')
        url = f"https://lista.mercadolivre.com.br/{query}"
        headers = {"User-Agent": "Mozilla/5.0"}

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return "Link do Mercado Livre não encontrado"

        soup = BeautifulSoup(response.text, 'html.parser')
        first_result = soup.find('a', class_='ui-search-link', href=True)
        if first_result:
            return first_result['href']

        return "Link do Mercado Livre não encontrado"

    except Exception:
        return "Erro ao buscar link no Mercado Livre"
