import React, { useEffect, useState } from 'react';

function Stars({ value, onChange }) {
  const stars = [1,2,3,4,5];
  return (
    <div className="flex gap-1">
      {stars.map(s => (
        <button key={s} type="button" onClick={() => onChange && onChange(s)} className="text-amber-400 text-xl leading-none">
          {s <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('pressly_reviews');
    if (raw) setReviews(JSON.parse(raw));
  }, []);

  const saveReviews = (next) => {
    localStorage.setItem('pressly_reviews', JSON.stringify(next));
    setReviews(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = [{ name: name || 'Anonymous', rating, comment, date: new Date().toISOString() }, ...reviews];
    saveReviews(next);
    setName(''); setRating(5); setComment(''); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-vintage mb-2">Reviews</h2>
      <p className="text-ink text-sm mb-4">Real feedback from real customers — helps others decide.</p>

      <section className="mb-6">
        <form onSubmit={handleSubmit} className="bg-cream p-4 rounded shadow flex flex-col gap-3">
          <div className="flex gap-2">
            <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="flex-1 px-3 py-2 border rounded text-ink bg-white" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink">Rating</span>
              <Stars value={rating} onChange={setRating} />
            </div>
          </div>
          <textarea placeholder="Write a short review" value={comment} onChange={e => setComment(e.target.value)} rows={3} className="px-3 py-2 border rounded text-ink bg-white" />
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 btn-vintage">Submit Review</button>
            {saved && <div className="text-sm text-emerald-600">Saved</div>}
          </div>
        </form>
      </section>

      <section>
        {reviews.length === 0 ? (
          <div className="text-ink">No reviews yet. Be the first to write one!</div>
        ) : (
          <ul className="flex flex-col gap-3">
            {reviews.map((r, i) => (
              <li key={i} className="bg-cream p-3 rounded shadow">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-ink">{r.name}</div>
                  <div className="text-sm text-vintage-strong">{new Date(r.date).toLocaleString()}</div>
                </div>
                <div className="mt-1">
                  <Stars value={r.rating} />
                </div>
                <div className="mt-2 text-ink text-sm">{r.comment}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
