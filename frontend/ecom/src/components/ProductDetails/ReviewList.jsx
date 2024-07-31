import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppURL from '../../api/AppURL';
import axios from 'axios';

const ReviewList = ({ code }) => {
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        axios.get(AppURL.ReviewList(code))
            .then(response => {
                setReviewData(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews', error);
            });
    }, [code]);

    const renderStars = (rating) => {
        return Array.from({ length: rating }, (_, i) => (
            <i key={i} className="fa fa-star text-success"></i>
        ));
    };

    const MyView = reviewData.map((review, i) => (
        <div key={i}>
            <p className="p-0 m-0">
                <span className="Review-Title">{review.reviewer_name}</span>
                <span>{renderStars(parseInt(review.reviewer_rating))}</span>
            </p>
            <p>{review.reviewer_comments}</p>
        </div>
    ));

    return (
        <div>
            <h6 className="mt-2">REVIEWS</h6>
            {reviewData.length > 0 ? MyView : <p>There have no review Yet</p>}
        </div>
    );
};

export default ReviewList;
