<template>
    <div>
        <div>
            <button @click.prevent="remove">delete</button>
        </div>
    </div>
</template>

<script>

export default {
    props: ['id', 'category'],
    data: function(){
        return {

        }
    },
    methods:{
        remove(){
            if(this.category == 'questions')this.$store.dispatch('removeQuestion', this.id)
            else this.$store.dispatch('removeAnswer', this.id)
        }   
    }
}
</script>

<style scoped>

</style>