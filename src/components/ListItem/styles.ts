import styled from 'styled-components';

type ContainerProps = {
    done: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    background-color: #20212C;
    margin: 10px;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;

    input[type="checkbox"]{
        display: none;
    }
    
    input[type="text"] {
        border: 1px solid #CCC; 
        background-color: #2C2C38; 
        color: #FFF; [cor: #FFF;]
        padding: 5px; [preenchimento: 5px;
        border-radius: 5px; [raio da borda: 5px;
        width: 100%; 
}
    .text-lime-500 {
        color: limegreen;
        margin-right: 5px;
        cursor: pointer;
    }

    .text-gray-500 {
        color: gray;
        margin-right: 5px;
        cursor: pointer;
    }

    label {
        color: #CCC;
        text-decoration: ${(props) => props.done ? 'line-through' : 'initial'};
        cursor: pointer;
    }
`;
