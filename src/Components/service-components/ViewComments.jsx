import React, { useState, useEffect } from 'react';

export function ViewComments({ userId, serviceId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://tulookapiv2.vercel.app/api/api/comments/${serviceId}/service`
      );
      const data = await response.json();
      setComments(data); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(); 

    const intervalId = setInterval(fetchComments, 1000); 

    return () => {
      clearInterval(intervalId);
    };
  }, [serviceId]);

  if (loading) return <div className="text-gray-500">Cargando comentarios...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-purple mb-4">Comentarios</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 border-b border-gray-300">
            <div>
              <p className="text-lg">{comment.comment}</p>
              <p className="text-yellow">
                {"★".repeat(comment.rate)}{"☆".repeat(5 - comment.rate)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}
    </div>
  );
}
