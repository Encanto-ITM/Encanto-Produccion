import React, { useState, useEffect } from 'react';

export function CommentsService({
  serviceId,
  userId,
  initialComment = '',
  initialRating = 0,
  onClose,
  commentId,
  onCommentUpdated,
}) {
  const [comment, setComment] = useState(initialComment);
  const [rating, setRating] = useState(initialRating);
  const [hasCommented, setHasCommented] = useState(false);
  const [userComment, setUserComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const checkIfCommented = async () => {
      try {
        const response = await fetch(
          `https://tulookapiv2.vercel.app/api/api/comments/${serviceId}/service`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const userComment = data.find((comment) => comment.user_id === userId);
          if (userComment) {
            setHasCommented(true);
            setComment(userComment.comment);
            setRating(userComment.rate);
            setUserComment(userComment);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkIfCommented();
  }, [serviceId, userId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const commentData = {
      user_id: userId,
      service_id: serviceId,
      comment: comment,
      rate: rating,
    };

    try {
      const method = userComment ? 'PUT' : 'POST';
      const url = userComment
        ? `https://tulookapiv2.vercel.app/api/api/comments/${userComment.id}`
        : 'https://tulookapiv2.vercel.app/api/api/comments';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      setHasCommented(true);
      setUserComment(data);
      setComment(data.comment);
      setRating(data.rate);
      setIsEditing(false);

      if (onCommentUpdated) onCommentUpdated(data); 
      if (onClose) onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-6">
      <h3 className="text-2xl font-semibold text-purple mb-4">
        {hasCommented && !isEditing ? 'Tu comentario' : 'Deja tu comentario y valoración'}
      </h3>

      {hasCommented && !isEditing ? (
        <div>
          <p className="text-lg mb-2">Tu comentario:</p>
          <p>{userComment ? userComment.comment : 'No hay comentario disponible.'}</p>
          <div className="flex items-center space-x-2 mt-2">
            {[...Array(5)].map((_, index) => (
              <button
                type="button"
                key={index}
                className={`text-2xl ${index < userComment.rate ? 'text-yellow' : 'text-gray-400'}`}
                disabled
              >
                ★
              </button>
            ))}
          </div>
          <p className="mt-2 text-gray-600">
            Puedes editar tu comentario si lo deseas.
          </p>
          <button
            onClick={() => setIsEditing(true)} 
            className="mt-4 bg-purple text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700"
          >
            Editar comentario
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Escribe tu comentario..."
            className="w-full p-2 border rounded-lg resize-none"
            rows="4"
          />
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <button
                type="button"
                key={index}
                className={`text-2xl ${index < rating ? 'text-yellow' : 'text-gray-400'}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-purple text-white py-2 rounded-lg transition duration-300 hover:bg-blue-700"
          >
            {userComment ? 'Actualizar comentario' : 'Enviar comentario'}
          </button>
        </form>
      )}
    </div>
  );
}
