import styles from './Header.module.css';
import React from 'react';


export class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <h1>Лабораторная работа №4</h1>
                <p>Исаева Александра-Ирина P3209</p>
                <p>Вариант 6</p>
            </header>
        );
    }
}
