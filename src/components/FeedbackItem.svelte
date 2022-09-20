<script>
    // create event handler to send data up to main app location
    import {createEventDispatcher} from 'svelte'
    import { raf } from 'svelte/internal';
    import { fade } from 'svelte/transition'
    import CardContainer from "./CardContainer.svelte";
    import Reply from './Reply.svelte'
    export let item
    export let replies_arr
    const dispatch = createEventDispatcher()
    let replies_drawdown = false

    // handle delete event dispatcher to remove feedback
    const handle_delete = (id) => {
        dispatch("event_dispatcher_click_delete", id)
    }

    // handle the arrow counter variable upon click
    const handle_arrow_move = (id, change_idx) => {
        replies_drawdown = !replies_drawdown
    }

    // handle reaction to comment
    const handle_like_status = (idx, id) => {
        dispatch("liked_status_dispatcher", {idx: idx, id: id})
    }

    // handle commenting mode
    const handle_comment_mode = () => {
        dispatch("comment_mode_dispatcher")
    }

    // handle the item id recording
    const handle_item_id = (id) => {
        dispatch("item_id_dispatcher", id)
    }

    // nested event handler function to process all event handlers at once (multiple event handler functionality not permitted)
    const nested_event_handler_func = (id, flag, content) => {
        handle_arrow_move(id, flag)
        handle_comment_mode()
        handle_item_id(id)
    }

    const nested_event_handler_down_arrow = (id, flag) => {
        handle_arrow_move(id, flag)
        handle_comment_mode()
    }
</script>

<CardContainer>
    <div class="num_display">
        {item.rating}
    </div>
    <button class="x_display" on:click={() => handle_delete(item.fid)}>X</button>
    <div class="content_display">
        {item.content}
    </div>
    {#if !replies_drawdown}
    <!--create a nested function to process all event handlers-->
        <button class="gg-arrow-up-r" on:click={() => nested_event_handler_func(item.fid, true, item)}></button>
    {/if}
    {#if replies_drawdown}
        <button class="gg-arrow-down-r" on:click={() => nested_event_handler_down_arrow(item.fid, false, item)}></button>
    {/if}
</CardContainer>

<!--create reply section under each feedback item-->
{#if replies_drawdown}
    {#each replies_arr[replies_arr.length-item.fid] as ra}
        <Reply>
            <div class="reply_display_txt">
                {ra.content}
            </div>
            <div>
                <!--conditionals for heart icon reaction to comment-->
                {#if ra.liked}
                    <button class="gg-heart-red" on:click={() => handle_like_status(item.fid, ra.id)} transition:fade="{{duration:200}}"
                        ></button>
                {/if}
                {#if !raf.liked}
                    <button class="gg-heart-blank" on:click={handle_like_status(item.fid, ra.id)} transition:fade="{{duration:200}}"
                    ></button>
                {/if}
            </div>
        </Reply>
    {/each}
{/if}

<!--styling options-->
<style>
    .reply_display_txt {
        text-align: center;
    }
    .content_display {
        font-size: 21px;
        position: absolute;
        text-align: center;
        margin: -20px 0px;
    }
    .num_display {
        position: absolute;
        text-align: center;
        font-size: 19px;
        top: -10px;
        left: -10px;
        width: 50px;
        height: 50px;
        background:#ff6a95;
        color: #fff;
        border: 1px #eee solid;
        border-radius: 50%;
        padding: 10px;
        text-align: center;
    }
    .x_display {
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
        border-radius: 50%;
        background-color: #fff;
        border: none;
    }
    /*up arrow styling*/
    .gg-arrow-up-r {
        box-sizing: border-box;
        display: block;
        width: 22px;
        position: absolute;
        cursor: pointer;
        height: 22px;
        top: 50px;
        margin: 0px 625px;
        border: 2px solid;
        transform: scale(var(--ggs,1));
        border-radius: 4px
    }
    .gg-arrow-up-r::after,
    .gg-arrow-up-r::before {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 4px
    }

    .gg-arrow-up-r::after {
        width: 6px;
        height: 6px;
        border-top: 2px solid;
        border-left: 2px solid;
        transform: rotate(45deg);
        left: 6px
    }

    .gg-arrow-up-r::before {
        width: 2px;
        height: 10px;
        left: 8px;
        background:black
    }
    /*down arrow styling*/
    .gg-arrow-down-r {
        box-sizing: border-box;
        display: block;
        width: 22px;
        position: absolute;
        cursor: pointer;
        height: 22px;
        top: 50px;
        margin: 0px 625px;
        border: 2px solid;
        transform: scale(var(--ggs,1));
        border-radius: 4px
    }
    .gg-arrow-down-r::after,
    .gg-arrow-down-r::before {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        bottom: 4px
    }
    .gg-arrow-down-r::after {
        width: 6px;
        height: 6px;
        border-bottom: 2px solid;
        border-left: 2px solid;
        transform: rotate(-45deg);
        left: 6px
    }
    .gg-arrow-down-r::before {
        width: 2px;
        height: 10px;
        left: 8px;
        background: currentColor
    }

    /*heart icon on the left side of reply block RED*/
    .gg-heart-red,
    .gg-heart-red::after {
        border: 2px solid;
        border-top-left-radius: 100px;
        border-top-right-radius: 100px;
        width: 10px;
        height: 8px;
        top: -5px;
        cursor: pointer;
        border-bottom: 0;
        background-color: #ff6a95;
    }
    .gg-heart-red {
        box-sizing: border-box;
        position: relative;
        transform:
            translate(
                calc(-10px / 2 * var(--ggs,1)),
                calc(-6px / 2 * var(--ggs,1))
            )
            rotate(-45deg)
            scale(var(--ggs,1));
        display: block;
        background-color: red;
    }
    .gg-heart-red::after,
    .gg-heart-red::before {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
    }
    .gg-heart-red::after {
        right: -9px;
        transform: rotate(90deg);
        top: 5px;
    }
    .gg-heart-red::before {
        width: 11px;
        height: 11px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        left: -2px;
        top: 3px;
        background-color: #ff6a95;
    }
    /*heart icon on the left side of reply block BLANK*/
    .gg-heart-blank,
    .gg-heart-blank::after {
        border: 2px solid;
        border-top-left-radius: 100px;
        border-top-right-radius: 100px;
        width: 10px;
        height: 8px;
        top: 10px;
        cursor: pointer;
        border-bottom: 0;
        background-color: #fff;
    }
    .gg-heart-blank {
        box-sizing: border-box;
        position: absolute;
        transform:
            translate(
                calc(-10px / 2 * var(--ggs,1)),
                calc(-6px / 2 * var(--ggs,1))
            )
            rotate(-45deg)
            scale(var(--ggs,1));
        display: block;
        background-color: #fff;
    }
    .gg-heart-blank::after,
    .gg-heart-blank::before {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
    }
    .gg-heart-blank::after {
        right: -9px;
        transform: rotate(90deg);
        top: 5px;
    }
    .gg-heart-blank::before {
        width: 11px;
        height: 11px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        left: -2px;
        top: 3px;
        background-color: #fff;
    }
</style>