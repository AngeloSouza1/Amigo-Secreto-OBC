import random
from flask_mail import Message
from utils.ai_utils import recomendar_presentes

def realizar_sorteio(event, participants, mail):
    shuffled_participants = participants.copy()
    random.shuffle(shuffled_participants)

    banner_url = "https://img.freepik.com/fotos-gratis/mao-de-colheita-segurando-o-presente_23-2147825793.jpg?ga=GA1.1.943838052.1724854383&semt=ais_hybrid"
    for i, giver in enumerate(shuffled_participants):
        receiver = shuffled_participants[(i + 1) % len(shuffled_participants)]
        recommendations = recomendar_presentes(receiver.preferences)

        recommendations_html = "".join(
            f"<li style='margin-bottom: 8px; font-weight: bold; text-transform: uppercase;'>{item}</li>"
            for item in recommendations.split("\n") if item.strip()
        )

        msg = Message(
            subject=f"🎁 Sorteio do Amigo Oculto - Evento: {event.name}",
            recipients=[giver.email],
            html=f"""
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">

                    <h2 style="text-align: center; color: #007bff; margin-bottom: 20px;">🎉 Sorteio do Amigo Oculto 🎉</h2>

                    <!-- Banner -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="{banner_url}" alt="Amigo Oculto" style="max-width: 100%; height: auto; border-radius: 10px;">
                    </div>

                    <p style="font-size: 1.1em; text-align: justify; line-height: 1.6;">
                        Olá, <strong>{giver.name}</strong>! 🎈
                    </p>

                    <p style="font-size: 1.1em; text-align: justify; line-height: 1.6;">
                        Você tirou <strong style="color: #28a745;">{receiver.name}</strong> no amigo oculto do evento "<strong>{event.name}</strong>"! 🎁
                    </p>

                    <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #28a745; margin: 20px 0; border-radius: 5px;">
                        <h3 style="color: #ff6347; margin-bottom: 10px; text-transform: uppercase;">📝 Gostos e Preferências:</h3>
                        <p style="margin: 0; text-align: justify; font-weight: bold; text-transform: uppercase;">{receiver.preferences}</p>
                    </div>

                    <div style="background-color: #e9ecef; padding: 15px; border-left: 5px solid #ffc107; margin: 20px 0; border-radius: 5px;">
                        <h3 style="color: #ffc107; margin-bottom: 10px; text-transform: uppercase;">🎁 Sugestões de Presentes:</h3>
                        <ul style="padding-left: 20px; text-align: justify; margin: 0;">
                            {recommendations_html}
                        </ul>
                    </div>

                    <p style="font-size: 1.1em; text-align: center; line-height: 1.6; margin: 20px 0;">
                        Boa sorte na escolha do presente! 🎉✨
                    </p>

                    <hr style="border: none; height: 1px; background-color: #ddd; margin: 30px 0;">

                    <p style="text-align: center; font-size: 0.9em; color: #777; margin: 0;">
                        Atenciosamente,<br>
                        <strong>Equipe do Amigo Oculto</strong> 🎈
                    </p>
                </div>
            </div>
            """
        )

        mail.send(msg)
