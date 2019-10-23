<template>
<b-card border-variant="dark" :header="getTitle.title" align="center">
    <div class='cardss'>
        <b-card-text v-html='getTitle.description'></b-card-text>
    </div>
        <hr>
    <div class="row">
        <div class="col-8">
            <div class='tagss'>
                <div v-for='(tag,i) in getTitle.tags' :key='i'>
                    <Tag :get-tag='tag'/>
                </div>
            </div>
        </div>
        <div class="col-4">
            <a >by: {{ getTitle.UserId.username }}</a>
        </div>
    </div>
        <hr>
</b-card>
</template>

<script>
import Tag from './Tag'

export default {
    props: ['getTitle'],
    components: {
        Tag
    }
}
</script>

<style>
.cardss{
    text-align: left !important
}
</style>