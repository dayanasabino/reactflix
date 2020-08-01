import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
    const [categorias, setCategorias] = useState([]);

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '#000',
    }

    const [values, setValues] = useState(valoresIniciais);
    
    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor, // nome: 'valor'
        })
    }

    function handleChange(infosDoEvento){
        const { getAttribute, value } = infosDoEvento.target;
        setValue(
            infosDoEvento.target.getAttribute('name'),
            value
        );
    }
    // params: o que quer que aconteça e quando quer que aconteça []
    // se ao final passar um array vazio ele só vai acontecer 1x quando iniciar
    useEffect(() => {
        const URL = 'http://localhost:8080/categorias';
        fetch(URL).then(async (respostaDoServidor) => {
            const resposta = await respostaDoServidor.json();
            setCategorias(
                [
                    ...resposta,
                ]);
        });
    }, []);

    return(
        <PageDefault>
            <h1> Cadastro de Categoria: {values.nome} </h1>
            
            <form onSubmit={function handleSubmit(info){
                info.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais);
            }}>

           <FormField 
                label = 'Nome da Categoria'
                type = 'text'
                name = 'nome'
                value={values.nome}
                onChange = {handleChange}
           />

            <FormField 
                label = 'Descrição'
                type = 'textarea'
                name = 'descricao'
                value={values.descricao}
                onChange = {handleChange}
           />

            <FormField 
                label = 'Cor'
                type = 'color'
                name = 'cor'
                value={values.cor}
                onChange = {handleChange}
           />

                <Button> Cadastrar </Button>
            </form>

            <ul>
                {categorias.map((categoria) => {
                    return (
                        <li key={`${categoria.nome}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            <Link to='/'>
                Ir pra Home
            </Link>
        </PageDefault>
    );
}

export default CadastroCategoria;
