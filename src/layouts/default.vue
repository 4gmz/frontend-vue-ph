<template>
    <section>
        <navbar />
        <router-view class="ajuste7887" />
    </section>
</template>
<script>
export default {
    components:{
        navbar: ()=>import('../components/navbar')
    }
}
</script>
<style lang="scss">
#app{
    font-size: 14px;
}
.ajuste7887{
    position: relative;
    top: 76px;
}
.modal{
    .modal-content{
        border: none !important;
        box-shadow: 0 0 60px rgba(0,0,0,0.25);
        border-radius: 8px;
        overflow: hidden;

        .modal-header{
            background: #007bff;
            color: white;
        }
    }
}
</style>