<script>
    export let average_rating
    export let count

</script>

<div class='feedback_stats'>
    <h4>{count} Reviews</h4>
    <h4>Average Rating: {average_rating}</h4>
</div>

<style>
    .feedback_stats {
        display: flex;
        justify-content: space-between;
        padding: 0 100px;
    }
</style>