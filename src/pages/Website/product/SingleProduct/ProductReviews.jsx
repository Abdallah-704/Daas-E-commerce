import React, { useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdStar, MdOutlineStarBorder, MdPerson, MdThumbUp, MdThumbUpOffAlt } from 'react-icons/md';

const ProductReviews = ({ reviews = [], rating, onAddReview }) => {
    const { theme } = useTheme();
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [likedReviews, setLikedReviews] = useState({});
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

    const handleRatingClick = (value) => {
        setNewReview(prev => ({ ...prev, rating: value }));
    };

    const handleCommentChange = (e) => {
        setNewReview(prev => ({ ...prev, comment: e.target.value }));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (newReview.comment.trim()) {
            onAddReview(newReview);
            setNewReview({ rating: 5, comment: '' });
        }
    };

    const toggleLikeReview = (reviewId) => {
        setLikedReviews(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    return (
        <div style={{
            backgroundColor: theme.colors.card,
            padding: isSmallDevice ? "15px" : "30px",
            borderRadius: theme.borderRadius.medium,
            boxShadow: theme.shadows.medium,
        }}>
            <h2 style={{
                fontSize: isSmallDevice ? "20px" : "24px",
                color: theme.colors.text,
                marginBottom: "20px",
            }}>
                Product Reviews
            </h2>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
            }}>
                <div style={{ display: "flex" }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <MdStar
                            key={index}
                            color={index < rating ? theme.colors.warning : theme.colors.textSecondary}
                            size={20}
                        />
                    ))}
                </div>
                <span style={{ color: theme.colors.textSecondary }}>
                    ({rating} / 5)
                </span>
            </div>

            <form onSubmit={handleSubmitReview} style={{ marginBottom: "30px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{
                        display: "block",
                        color: theme.colors.text,
                        marginBottom: "10px",
                    }}>
                        Your Rating
                    </label>
                    <div style={{ display: "flex", gap: "5px" }}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => handleRatingClick(value)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "0",
                                }}
                            >
                                {value <= newReview.rating ? (
                                    <MdStar color={theme.colors.warning} size={24} />
                                ) : (
                                    <MdOutlineStarBorder color={theme.colors.textSecondary} size={24} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <textarea
                        value={newReview.comment}
                        onChange={handleCommentChange}
                        placeholder="Write your review here..."
                        style={{
                            width: "100%",
                            minHeight: "100px",
                            padding: "10px",
                            borderRadius: theme.borderRadius.small,
                            border: `1px solid ${theme.colors.border}`,
                            backgroundColor: theme.colors.input,
                            color: theme.colors.text,
                            resize: "vertical",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: theme.colors.button,
                        color: theme.colors.text,
                        border: "none",
                        borderRadius: "20px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                            backgroundColor: theme.colors.buttonHover,
                        }
                    }}
                >
                    Submit Review
                </button>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        style={{
                            borderBottom: `1px solid ${theme.colors.border}`,
                            paddingBottom: "20px",
                        }}
                    >
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                        }}>
                            <MdPerson size={24} color={theme.colors.textSecondary} />
                            <span style={{ color: theme.colors.text }}>
                                {review.userName || "Anonymous"}
                            </span>
                            <span style={{ color: theme.colors.textSecondary }}>
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>

                        <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <MdStar
                                    key={i}
                                    color={i < review.rating ? theme.colors.warning : theme.colors.textSecondary}
                                    size={16}
                                />
                            ))}
                        </div>

                        <p style={{
                            color: theme.colors.textSecondary,
                            marginBottom: "10px",
                        }}>
                            {review.comment}
                        </p>

                        <button
                            onClick={() => toggleLikeReview(index)}
                            style={{
                                background: "none",
                                border: "none",
                                color: likedReviews[index] ? theme.colors.button : theme.colors.textSecondary,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                padding: "5px 10px",
                            }}
                        >
                            {likedReviews[index] ? <MdThumbUp size={20} /> : <MdThumbUpOffAlt size={20} />}
                            {review.likes || 0} Likes
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews; 