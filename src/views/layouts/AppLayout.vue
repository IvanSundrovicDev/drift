<template>
    <div class="AppLayout">
        <nav class="AppLayout__nav h-full">
            <TopNavbar></TopNavbar>
        </nav>
        <main class="AppLayout__main h-screen">
            <left-navbar></left-navbar>
            <slot/>
        </main>
        <footer class="AppLayout__footer">
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