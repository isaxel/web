import React, {type ChangeEvent} from 'react';
import type { CoordinatesRequest } from '../../../redux/types.ts';
import styles from '../Form.module.css';
import store from "../../../redux/store.ts";
import {addResultThunk, changeR} from "../../../redux/actions/resultsActions.ts";


interface CoordinatesFormState {
    x: string
    y: string
    r: string
    errors: {
        y: string | null,
        r: string | null;
    }
}

export class CoordinatesForm extends React.Component<object, CoordinatesFormState> {
    xArray = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
    rArray = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];

    constructor(props: object) {
        super(props);
        this.state = {
            x: '0',
            y: '',
            r: '0',
            errors: {
                y: null,
                r: null
            }
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        })
        if(name == 'r') {
            store.dispatch(changeR(Number(value)));
        }
    };

    validateY = (y: string): string | null => {
        if(!y.trim()) {
            return "Выберите значение Y";
        }
        const yNum = Number(y.trim().replace(',','.'));
        if(isNaN(yNum)) {
            return "Y должно быть числом";
        }
        if(yNum < -3 || yNum > 3) {
            return "Y должно быть от -3 до 3";
        }
        return null;
    }

    validateR = (r: string): string | null => {
        const rNum = Number(r);
        if(rNum <= 0) {
            return "R должен быть положительным";
        }
        return null;
    }

    handleXClick = (value: string) => {
        this.setState({ ...this.state, x: value });
    };

    handleRClick = (value: string) => {
        this.setState({ ...this.state, r: value });
        store.dispatch(changeR(Number(value)));
    };


    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const yError = this.validateY(this.state.y);
        const rError = this.validateR(this.state.r);
        this.setState({
            ...this.state,
            errors: {
                r: rError,
                y: yError
            }
        });
        if(yError || rError) return;
        const formData: CoordinatesRequest = {
            x: Number(this.state.x.trim().replace(",",".")),
            y: Number(this.state.y.trim().replace(",",".")),
            r: Number(this.state.r.trim().replace(",",".")),
            clientTimestamp: Date.now(),
            clientTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        this.setState({
            ...this.state,
            x: "0",
            y: "",
            r: "0",
            errors: {
                r: rError,
                y: yError
            }
        });
        store.dispatch(addResultThunk(formData));
    };

    render() {
        return (
            <div className={styles.formContainer}>
                <h2>Параметры</h2>
                <form onSubmit={this.handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Координата X</label>
                        {/*<select*/}
                        {/*    name="x"*/}
                        {/*    value={this.state.x}*/}
                        {/*    onChange={this.handleChange}*/}
                        {/*    className={styles.selectInput}*/}
                        {/*>*/}
                        <div className={styles.buttonGroup}>
                            {this.xArray.map(value => (
                                <button
                                    type="button"
                                    key={value}
                                    onClick={() => this.handleXClick(value)}
                                    className={
                                        this.state.x === value
                                            ? styles.activeButton
                                            : styles.valueButton
                                    }
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                            {/*{this.xArray.map(value => (*/}
                            {/*    <option key={value} value={value}>{value}</option>*/}
                            {/*))}*/}
                        {/*</select>*/}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="y-input" className={styles.label}>
                            Координата Y (от -3 до 3)
                        </label>
                        <input id="y-input" type="text"
                               value={this.state.y} name = "y"
                               placeholder="От -3 до 3"
                               className={styles.textInput} onChange={this.handleChange}
                        />
                        {this.state.errors.y &&
                            (<label className={styles.errorMessage}>{this.state.errors.y}</label>)
                        }
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Радиус R</label>
                        {/*<select*/}
                        {/*    name="r"*/}
                        {/*    value={this.state.r}*/}
                        {/*    onChange={this.handleChange}*/}
                        {/*    className={styles.selectInput}>*/}
                        {/*    {this.rArray.map(value => (*/}
                        {/*        <option key={value} value={value}>{value}</option>*/}
                        {/*    ))}*/}
                        {/*</select>*/}
                        <div className={styles.buttonGroup}>
                            {this.rArray.map(value => (
                                <button
                                    type="button"
                                    key={value}
                                    onClick={() => this.handleRClick(value)}
                                    className={
                                        this.state.r === value
                                            ? styles.activeButton
                                            : styles.valueButton
                                    }
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                        {this.state.errors.r &&
                            (<label className={styles.errorMessage}>{this.state.errors.r}</label>)
                        }
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Проверить
                    </button>
                </form>
            </div>
        );
    }
}