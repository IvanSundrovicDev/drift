<template>
    <div class="AppLayout">
        <nav class="AppLayout__nav">
            <TopNavbar></TopNavbar>
        </nav>
        <main class="AppLayout__main">
            <div class="grid grid-flow-col auto-cols-max h-screen">
                <left-navbar></left-navbar>
                <slot/>
            </div>
        </main>
        <footer class="AppLayout__footer">
            <router-view></router-view>
        </footer>
    </div>
</template>

<script>
    import LeftNavbar from "../../components/partials/LeftNavbar";
    import TopNavbar from "../../components/partials/TopNavbar";

    export default {
        name: "AppLayout",
        components: {
            LeftNavbar, TopNavbar
        }
    }
</script>