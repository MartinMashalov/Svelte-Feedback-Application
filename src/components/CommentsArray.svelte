<script>
    // add smoother transitions/animations to the svelte application
    import { fade } from 'svelte/transition'
    import FeedbackItem from "./FeedbackItem.svelte";
    export let feedback_arr
    export let replies_arr = []
</script>

<!--event handler is the name passed into the dispatcher function one level down-->
{#each feedback_arr as fb}
    <div transition:fade="{{duration:200}}">
        <FeedbackItem item={fb} replies_arr={replies_arr} on:event_dispatcher_click_delete
        on:liked_status_dispatcher on:comment_mode_dispatcher on:item_id_dispatcher/>
    </div>
{/each}