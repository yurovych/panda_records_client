import React from 'react';
import styles from './ErrorPage.module.scss';

export const ErrorPage: React.FC = () => {
    return (
        <div className={styles.error}>
            <h1 className={styles.error__text}>Error<br/>try later</h1>
        </div>
    )
}