from flask import Blueprint, request, jsonify
from models import db, Event, User
from utils.mailer import realizar_sorteio
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from extensions import mail  # Importar mail de extensions
from utils.ai_utils import recomendar_presentes  # Importa a função de recomendação de presentes
import logging  


event_bp = Blueprint('event_bp', __name__)

# Configuração básica de logging
logging.basicConfig(level=logging.DEBUG)

# ✅ Endpoint para criação de evento
@event_bp.route('/api/event', methods=['POST'])


def create_event():
    try:
        data = request.get_json()
        required_fields = ['name', 'email', 'secret']

        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        if missing_fields:
            return jsonify({"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}), 400

        new_event = Event(
            name=data['name'],
            email=data['email'],
            secret=data['secret']
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({"message": "Evento criado com sucesso!", "event_id": new_event.id}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": f"Erro ao criar o evento: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500


# ✅ Endpoint para listar todos os eventos
@event_bp.route('/api/events', methods=['GET'])
def get_events():
    try:
        events = Event.query.all()
        if not events:
            return jsonify({"message": "Nenhum evento encontrado."}), 200

        events_list = [
            {
                "id": event.id,
                "name": event.name,
                "email": event.email
            }
            for event in events
        ]
        return jsonify(events_list), 200

    except SQLAlchemyError as e:
        return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500


# ✅ Endpoint para buscar detalhes de um evento específico
@event_bp.route('/api/event/<int:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = Event.query.get(event_id)
        if not event:
            return jsonify({"error": "Evento não encontrado."}), 404

        # Buscar os participantes associados ao evento
        participants = User.query.filter_by(event_id=event_id).all()
        participants_list = [
            {
                "id": participant.id,
                "name": participant.name,
                "email": participant.email
            }
            for participant in participants
        ]

        event_data = {
            "id": event.id,
            "name": event.name,
            "email": event.email,
            "secret": event.secret,
            "participants": participants_list
        }

        return jsonify(event_data), 200

    except SQLAlchemyError as e:
        return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500


# ✅ Endpoint para atualizar um evento
@event_bp.route('/api/event/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        event = Event.query.get(event_id)
        if not event:
            return jsonify({"error": "Evento não encontrado."}), 404

        data = request.get_json()
        event.name = data.get('name', event.name)
        event.email = data.get('email', event.email)
        event.secret = data.get('secret', event.secret)

        db.session.commit()

        return jsonify({"message": "Evento atualizado com sucesso!", "event_id": event.id}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": f"Erro ao atualizar o evento: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500


# ✅ Endpoint para deletar um evento e seus participantes associados
@event_bp.route('/api/event/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        # Buscar o evento pelo ID
        event = Event.query.get(event_id)
        if not event:
            return jsonify({"error": "Evento não encontrado."}), 404

        # Excluir os participantes associados ao evento
        User.query.filter_by(event_id=event_id).delete()

        # Excluir o evento
        db.session.delete(event)
        db.session.commit()

        return jsonify({"message": "Evento e participantes associados deletados com sucesso!"}), 200

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": f"Erro de integridade ao deletar o evento: {str(e)}"}), 500

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": f"Erro ao deletar o evento: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500

# Endpoint para obter detalhes de um participante específico
@event_bp.route('/api/event/<int:event_id>/users/<int:user_id>', methods=['GET'])
def get_participant(event_id, user_id):
    try:
        participant = User.query.filter_by(event_id=event_id, id=user_id).first()
        if not participant:
            return jsonify({"error": "Participante não encontrado."}), 404

        participant_data = {
            "id": participant.id,
            "name": participant.name,
            "email": participant.email,
            "preferences": participant.preferences
        }

        return jsonify(participant_data), 200

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500

# Endpoint para atualizar os dados de um participante específico
@event_bp.route('/api/event/<int:event_id>/users/<int:user_id>', methods=['PUT'])
def update_participant(event_id, user_id):
    try:
        participant = User.query.filter_by(event_id=event_id, id=user_id).first()
        if not participant:
            return jsonify({"error": "Participante não encontrado."}), 404

        data = request.get_json()
        participant.name = data.get('name', participant.name)
        participant.email = data.get('email', participant.email)
        participant.preferences = data.get('preferences', participant.preferences)

        db.session.commit()
        return jsonify({"message": "Participante atualizado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500

# Endpoint para excluir um participante específico
@event_bp.route('/api/event/<int:event_id>/users/<int:user_id>', methods=['DELETE'])
def delete_participant(event_id, user_id):
    try:
        participant = User.query.filter_by(event_id=event_id, id=user_id).first()
        if not participant:
            return jsonify({"error": "Participante não encontrado."}), 404

        db.session.delete(participant)
        db.session.commit()

        return jsonify({"message": "Participante excluído com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500

# Endpoint para realizar o sorteio
@event_bp.route('/api/event/run/<int:event_id>/<string:secret>', methods=['GET'])
def run_draw(event_id, secret):
    try:
        # Buscar o evento pelo ID
        event = Event.query.get(event_id)
        if not event:
            return jsonify({"error": "Evento não encontrado."}), 404

        # Verificar a senha secreta
        if event.secret != secret:
            return jsonify({"error": "Senha incorreta."}), 403

        # Buscar os participantes associados ao evento
        participants = User.query.filter_by(event_id=event_id).all()
        if len(participants) < 2:
            return jsonify({"error": "São necessários pelo menos 2 participantes para o sorteio."}), 400

        # Realizar o sorteio e enviar recomendações
        realizar_sorteio(event, participants, mail)

        return jsonify({"message": "Sorteio realizado com sucesso! E-mails enviados."}), 200

    except SQLAlchemyError as e:
        return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500

@event_bp.route('/api/event/<int:event_id>/verify-secret', methods=['POST'])
def verify_event_secret(event_id):
    data = request.get_json()
    event = Event.query.get(event_id)

    if not event:
        return jsonify({'success': False, 'error': 'Evento não encontrado'}), 404

    if data.get('secret') == event.secret:
        return jsonify({'success': True}), 200

    return jsonify({'success': False, 'error': 'Senha incorreta'}), 403



