import openai
import os
from dotenv import load_dotenv

# Carregar a chave da API do arquivo config.env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def recomendar_presentes(preferences):
    try:
        prompt = f"Com base nos seguintes gostos e preferências: {preferences}, recomende 3 sugestões de presentes apropriados."

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100
        )

        suggestions = response.choices[0].message.content.strip()
        return suggestions

    except Exception as e:
        print(f"Erro ao gerar recomendações com IA: {str(e)}")
        return "Não foi possível gerar recomendações no momento."
