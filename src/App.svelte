
<script>
	import CommentsArray from './components/CommentsArray.svelte'
	import FeedbackForm from './components/FeedbackForm.svelte';
	import FeedbackStats from './components/FeedbackStats.svelte'

	let feedback_arr = [
		{fid: 4, rating: 8, content: 'Love this post!'},
		{fid: 3, rating: 4, content: 'Very dissapointed...'},
		{fid: 2, rating: 9, content: "Would love to see more of this in the future!!??"},
		{fid: 1, rating: 1, content: "Word..."}
	]
	let replies_arr = [
		[
			{id: 1, content: "Interesting!", liked: false},
			{id: 2, content: "Cool!", liked: false}
		],
		[],
		[],
		[]
	]

	// remove feedback item from data container
	const delete_post = (deleteID) => {
		let filtered_arr = []
		let filtered_replies_arr = []
		let delete_id = deleteID.detail
		console.log(delete_id)

		// filtering for both arrays by index
		if (feedback_arr.length > 1) {
			for (let i = 0; i<feedback_arr.length; i++) {
				if (feedback_arr[i]['fid'] != delete_id) { // find the detail from event forwarding mechanism
					filtered_arr.push(feedback_arr[i])
					filtered_replies_arr.push(replies_arr[i])
				}
			}
			feedback_arr = filtered_arr
			replies_arr = filtered_replies_arr
		}

		// fix ordering of ids in array
		for (let i = 0; i < feedback_arr.length; i++) {
				feedback_arr.at(i)['fid'] = feedback_arr.length - i
			}
	}

	// create add feedback function
	const add_feedback = (container) =>  {
		if (comment_mode) {
			const new_reply = container.detail
			let id = new_reply.id-1
			let current_comments = replies_arr[replies_arr.length - item_id_comment]
			var new_reply_container = {id: new_reply.comment_id, content: new_reply.content, liked: false}
			current_comments.push(new_reply_container)
			let new_comments = current_comments
			replies_arr[id] = new_comments
			if (replies_arr[id].length > 1) {
				replies_arr[id].at(-1)['id'] = replies_arr[id].at(-2)['id']+1
			}
		}
		else {
			const new_feedback = container.detail
			feedback_arr = [new_feedback, ...feedback_arr]
			replies_arr = [[], ...replies_arr]

			// fix mismatched indices when adding items to feedback array
			feedback_arr.at(0)['fid'] = feedback_arr.at(1)['fid'] + 1

			// fix ordering of ids in array
			for (let i = 0; i < feedback_arr.length; i++) {
				feedback_arr.at(i)['fid'] = feedback_arr.length - i
			}
		}
	}

	// adjust the liked button on each reply comment
	const adjust_liked = (container) => {
		let idx = container.detail.idx
		let id = container.detail.id
		let current_liked_status = replies_arr[replies_arr.length - idx][id-1]['liked']
		replies_arr[replies_arr.length - idx][id-1]['liked'] = !current_liked_status
	}

	// activate commenting mode
	$: comment_mode = false
	const handle_comment_mode = () => {
		comment_mode = !comment_mode
	}

	// handle the item id for commenting mode
	let item_id_comment
	const handle_item_id = (container) => {
		item_id_comment = container.detail
	}

	// create dynamic variable to track number of posts (reactive variable)
	$: count = feedback_arr.length
	// create dynamic variable to track average rating
	$: average_rating = Math.round(10*(feedback_arr.reduce((a, {rating}) => a + rating, 0) / feedback_arr.length)/10)
</script>

<main class="container">
	<FeedbackForm feedback_length_id={feedback_arr.length} replies_arr={replies_arr} item_id_comment={item_id_comment}
	comment_mode={comment_mode} on:feedback_container={add_feedback}/>
	<FeedbackStats {count} {average_rating}/>
	<CommentsArray {feedback_arr} {replies_arr} on:event_dispatcher_click_delete={delete_post} on:liked_status_dispatcher={adjust_liked}
	on:comment_mode_dispatcher={handle_comment_mode} on:item_id_dispatcher={handle_item_id}/>
</main>

<style>
</style>