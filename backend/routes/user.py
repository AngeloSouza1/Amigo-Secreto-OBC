from flask import Blueprint, request, jsonify
from models import db, User, Event

user_bp = Blueprint('user_bp', __name__)

# Endpoint para registrar um usuário
@user_bp.route('/api/event/<int:event_id>/users', methods=['POST'])
def register_user(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento não encontrado"}), 404

    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'email', 'preferences')):
        return jsonify({"error": "Dados incompletos. Os campos 'name', 'email' e 'preferences' são obrigatórios."}), 400

    new_user = User(
        event_id=event_id,
        name=data['name'],
        email=data['email'],
        preferences=data['preferences']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuário registrado com sucesso!", "user_id": new_user.id}), 201

# Endpoint para obter todos os usuários de um evento
@user_bp.route('/api/event/<int:event_id>/users', methods=['GET'])
def get_users(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento não encontrado"}), 404

    users = User.query.filter_by(event_id=event_id).all()
    if not users:
        return jsonify({"message": "Nenhum participante cadastrado neste evento."}), 200

    users_data = [{"id": user.id, "name": user.name, "email": user.email, "preferences": user.preferences} for user in users]
    return jsonify(users_data), 200
