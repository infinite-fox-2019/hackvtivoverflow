<template>
<div>
    <div v-for='(questionTag, i) in questionByTag' :key='i'>
        <TagForFindTag :question-tag='questionTag'/>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import TagForFindTag from '../components/TagForFindTag'

export default {
    data () {
        return {
            questionByTag: ''
        }
    },
    components: {
        TagForFindTag
    },
    methods: {
        fetchTags () {
            axios({
                method: 'get',
                url: `http://localhost:3000/questions/search/tags/${this.tag}`
            })
                .then(({data}) => {
                    this.questionByTag = data
                    this.tag = this.$route.params.name
                    this.$awn.success('fetch tags')
                })
                .catch(err => {
                    this.$awn.warning(err.response.data.msg)
                })
        }
    },
    computed: {
        tag () {
            return this.$route.params.name
        }
    },
    created () {
        this.fetchTags();
    }
}
</script>

<style>

</style>