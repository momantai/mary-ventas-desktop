<template>
    <div class="box-app">
        <div class="login-app" :class="{'try': login_process}">
            <div class="titulo">
                <h2> <small>Mary</small> Ventas App</h2>
            </div>
            <form action="" v-on:submit.prevent="authenticate">
                <input type="email" name="email" placeholder="Correo" v-model="email" autofocus :disabled="login_process">
                <input type="password" name="password" placeholder="Contraseña" v-model="password" :disabled="login_process">
                
                <button type="submit" :disabled="login_process">Iniciar Sesión</button>
            </form>

            <p v-if="error_login" style="color: red;">
                Datos erroneos
            </p>

            <p>Si tienes problemas para iniciar sesión contacta con tu administrador o intenta recuperar tu contraseña <a href="#">aquí</a>.</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                email: null,
                password: null,
                login_process: false,
                error_login: false
            }
        },
        methods: {
            authenticate: function () {
                this.login_try();

                axios.post('http://localhost:8000/api/auth/login', {
                    email: this.email,
                    password: this.password
                })
                    .then((response) => {
                        console.log("Hola Mundo");
                        this.sendHeaderAuth(response.data);
                    })
                    .catch((error) => {
                        this.errorLogin();
                        console.log(error);
                    });
                
                this.login_try();
            },
            sendHeaderAuth(data) {
                try {
                    headerAuth(data);
                } catch (error) {
                    
                }
            },
            login_try() {
                this.login_process = !this.login_process;
            },
            errorLogin() {
                this.error_login = true;
            }
        }
    }
</script>

<style>
    .box-app {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .box-app {
        width: 95vw;
        height: 95vh;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: aliceblue; */
    }

    input, button {
        font-size: 1.2rem;
        /* border: none; */
        padding: 10px 13px;
        border: 0;
        border-radius: 10px;
        display: block;
        box-shadow: 0 0 1px 1px #ccc;
        margin: 0 auto;
        margin-bottom: 15px;
    }
    button {
        background-color: #1779BA;
        color: #fff;
    }
    button:hover {
        cursor: pointer;
        background-color: #146ca7;
    }
    .titulo, p {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        text-align: center;
    }
    p {
        font-size: 0.8rem;
    }
    .titulo small {
        color: lightslategray;
    }
</style>