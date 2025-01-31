import { useState } from "react";
/*Je n'ai pas link à un fichier json pour le moment */
function FeedbackForm({ onSubmit = (data) => console.log(data) }) {
    const [score, setScore] = useState("10");
    const [comment, setComment] = useState("");

    //isDisabled lorsque le rating est en bas de 5/10 sans commentaire, sinon enabled
    const isDisabled = (Number(score) < 5) && (comment.trim().length <= 10);

    const textAreaPlaceholder = isDisabled
        ? "Your comment must be at least 10 characters long"
        : "Feedback...";

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ score, comment }); // Affiche les valeurs dans la console
        setScore("10");
        setComment("");
    };

    return (
        <form onSubmit={handleSubmit} className="feedback-form">
            <h2 className="form-title">Feedback form</h2>
            <div className="form-group">
                <label htmlFor="score">Score: {score}</label>
                <input
                    id="score" // L'attribut `id` est nécessaire pour lier le <label>
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    type="range"
                    min="0"
                    max="10"
                />
            </div>
            <div className="form-group">
                <label htmlFor="comment">Comment:</label>
                <textarea
                    placeholder={textAreaPlaceholder}
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <button type="submit" disabled={isDisabled}>Submit</button>
        </form>
    );
};

export default FeedbackForm;