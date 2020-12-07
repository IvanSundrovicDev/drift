<template>
    <app-layout>
        <div>
            <h1 style="height: 100px">Welcome to the dashboard</h1>
            <ul>
                <li v-for="ttt in test" :key="ttt.id">{{ ttt.username }}</li>
            </ul>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from "./layouts/AppLayout";
    import {API_URL} from "../main";
    import authHeader from "../helpers/auth-header";

    export default {
        name: "Dashboard",
        components: {
            AppLayout
        },
        data: function () {
            return {
              test: []
            }
        },
        mounted() {
            this.$axios.get(API_URL + 'users', { "headers": authHeader() }).then(data => {
                this.test = data.data
            })
        }
    }
</script>