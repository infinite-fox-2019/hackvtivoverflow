<template>
<div>
    <div v-for='(title,i) in find' :key='i'>
        <TitleSearch :get-title='title'/>
    </div>
</div>
</template>

<script>
import TitleSearch from '../components/TitleSearch'
import axios from 'axios'

export default {
    components: {
        TitleSearch
    },
    data () {
        return {
            find: ''
        }
    },
    methods: {
        filtering () {
            const title = this.$route.params.name
            console.log(title)
            axios({
                method: 'get',
                url: `http://localhost:3000/questions/find/${title}`
            })
                .then(({data}) => {
                    console.log(data)
                    this.find = data;
                    this.$awn.success('Filtering Search');
                })
                .catch(err => {
                    this.$awn.warning(err.response.data.msg)
                })
        }
    },
    created () {
        this.filtering()
    }
}
</script>

<style>

</style>