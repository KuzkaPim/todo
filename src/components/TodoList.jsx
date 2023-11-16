import styled from "styled-components";
import { useState } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

import { Container } from "../styles/style";

import trash from '../Resourse/trash.svg';
import done from '../Resourse/done.svg';

const TodoListEl = styled.div`
    h1 {
        text-align: center;
        color: #fff;
        opacity: .6;
        font-size: 3rem;
    }

    form {
        display: flex;
        margin: 50px auto 0 auto;
        height: 40px;
        width: 70%;
        border-radius: 10px;
        box-shadow: rgba(217, 200, 255, .2) 0 0 10px 1px;

        input {
            width: 100%;
            padding: 0 20px;
            border: none;
            border-radius: 10px 0 0 10px;
            background: rgba(24,26,26,.8);
            transition: .25s all ease;
            color: rgb(217, 200, 255);

            &:hover, &:focus {
                outline: none;
                background: rgba(24,26,26, .6);
            }
        }

        button {
            padding: 0 25px;
            font-weight: 500;
            cursor: pointer;
            border: none;
            border-radius: 0 10px 10px 0;
            background: rgba(217, 200, 255, 1);
            transition: .25s all ease;

            &:hover {
                background: rgb(217, 200, 255, .8);
            }
            &:active {
                background: rgb(217, 200, 255, .6);
            }
        }
    }

    ul {
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;

        li {
            min-width: 80px;
            position: relative;
            text-align: center;
            padding: 20px;
            word-break: break-all;
            background: rgba(217, 200, 255, 1);
            border-radius: 20px;
            box-shadow: rgba(217, 200, 255, .3) 0 0 7px 2px;
            
            div {
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(217, 200, 255, .9);
                left: 0;
                top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 20px;
                transition: .25s all ease;
                opacity: 0;

                img {
                    margin: 0 5px;
                    transition: .25s all ease;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.2);
                    }
                }
            }

            &:hover {
                div {
                    opacity: 1;
                }
            }
        }
    }
`;

const DoneTasks = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
`

const defaultStyle = {
    transition: `opacity ${500}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background: ${props => props.$active ? 'rgba(217, 200, 255, 1)' : 'rgba(217, 200, 255, .6)'};
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: .25s all ease;
    border-radius: ${props => props.$right ? '0 20px 20px 0' : '20px 0 0 20px'};

    &:hover {
        background: ${props => props.$active ? 'rgb(217, 200, 255, 1)' : 'rgba(217, 200, 255, .8)'};
    }
    &:active {
        background: ${props => props.$active ? 'rgb(217, 200, 255, 1)' : 'rgba(217, 200, 255, .6)'};
    }
`

const TodoList = () => {
    const [ taskValue, setTaskValue ] = useState('');
    const [ tasks, setTasks ] = useState([]);
    const [ doneTasks, setDoneTasks ] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        
        setTasks([...tasks, taskValue]);
        setTaskValue('');
    }

    const onDelete = (id) => {
        setTasks(tasks.filter((item, i) => i !== id))
    }

    return (
        <Container>
            <TodoListEl>
                <h1>Hi, just do it.</h1>
                <form onSubmit={e => onSubmit(e)}>
                    <input
                        onChange={e => setTaskValue(e.target.value)} 
                        value={taskValue} 
                        placeholder="Add a task." 
                        required type="text" />
                    <button type='submit'>Add</button>
                </form>
                <DoneTasks>
                    <Button $active>Tasks</Button>
                    <Button $right >Done Tasks</Button>
                </DoneTasks>
                <TransitionGroup component="ul">
                    {
                        tasks.map((item, i) => {
                            return (
                                <Transition
                                    key={i}
                                    in={tasks[i]}
                                    timeout={500}
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    {state => (
                                        <li style={{...defaultStyle, ...transitionStyles[state]}}>
                                            {item}
                                            <div>
                                                <img onClick={() => onDelete(i)} src={trash} alt="trash" />
                                                <img src={done} alt="done" />
                                            </div>
                                        </li>
                                    )}
                                </Transition>
                                
                            )
                        })
                    }
                </TransitionGroup>
            </TodoListEl>
        </Container>
    )
}

export default TodoList;



