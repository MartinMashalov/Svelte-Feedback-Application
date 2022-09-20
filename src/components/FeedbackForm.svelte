<script>
    import {v4 as uuidv4} from 'uuid'
    import {createEventDispatcher} from 'svelte'
    import CardContainer from './CardContainer.svelte';
    import Button from './Button.svelte';
    import Ratings from './Ratings.svelte'
    export let item_id_comment
    export let comment_mode
    export let replies_arr
    let text = ''
    export let feedback_length_id
    let ratings = 10
    let button_disabled = true
    let message_min_len = 10
    let message

    // create event dispatcher function
    const dispatch = createEventDispatcher()

    // create submission function
    const handle_submit = () => {
        let feedback_container = {}
        if (text.trim().length >= message_min_len) {
            if (comment_mode) {
                feedback_container = {
                    id: item_id_comment,
                    content: text,
                    rating: +ratings,
                    comment_id: replies_arr[replies_arr.length - item_id_comment].length + 1
                }
            }
            else {
                feedback_container = {
                    id: feedback_length_id+1,
                    content: text,
                    rating: +ratings
                }
            }
            dispatch('feedback_container', feedback_container)

            // clear the input box after submission
            text = ''
        }
    }

    // define selection function
    const handle_select = (e) => {
        ratings = e.detail
    }

    const handle_button_input  = () => {
        if (text.trim().length <= message_min_len) {
            message = `Text must be at least ${message_min_len} characters long`
            button_disabled = true
        }
        else {
            message = null
            button_disabled = false
        }
    }

</script>

<CardContainer>
    <header>
        <h2 class='form_header'>How would you rate your shopping experience?</h2>
    </header>
    <Ratings on:ratings_dispatcher={handle_select}/>
    <form on:submit|preventDefault={handle_submit}>
        <div class='input_group'>
            {#if comment_mode}
                <input type='text' placeholder="Comment on the post!" bind:value = {text} on:click={handle_button_input}>
            {/if}
            {#if !comment_mode}
                <input type='text' placeholder="Drop a Comment!" bind:value = {text} on:click={handle_button_input}>
            {/if}
            <Button disabled={button_disabled} type="submit">Post</Button>
        </div>
        <!--show the message from posting as a conditional statement-->
        {#if message}
            <div class="message">
                {message}
            </div>
        {/if}
    </form>
</CardContainer>

<style>
    header {
        max-width: 400px;
        margin: auto;
    }

    header h2 {
        font-size: 22px;
        font-weight: 600;
        text-align: center;
    }

    .input_group {
        display: flex;
        flex-direction: row;
        border: 1px solid #ccc;
        padding: 3px 2px;
        border-radius: 8px;
        margin-top: 10px;
    }
    input {
        flex-grow: 2;
        border: none;
        font-size: 16px;
        padding: 0px, 20px;
    }
    input:focus {
        outline: none;
    }
    .message{
        padding-top: 10px;
        text-align: center;
        color: rebeccapurple;
    }
</style>