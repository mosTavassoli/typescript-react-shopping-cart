import styled from 'styled-components';


export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 0.1rem solid lightblue;
    border-radius: 1.2rem;
    height: 100%;

    button{
        border-radius: 0 0 1.2rem 1.2rem;
    }

    img{
        max-height: 20rem;
        object-fit: cover;
        border-radius: 1.2rem 1.2rem 0 0;
    }

    div{
        height: 100%;
        font-family: Arail;
        padding: 1rem;  
    }

`;