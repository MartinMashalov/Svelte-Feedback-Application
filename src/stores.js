import { writable, Writable } from "svelte/store";

// create writeable store/database for svelte app
export const FeedbackStore = writable([
    {id: 1, rating: 8, content: 'Love this post!'},
	{id: 2, rating: 4, content: 'Very dissapointed...'},
	{id: 3, rating: 9, content: "Would love to see more of this in the future!!??"},
	{id: 4, rating: 1, content: "Word..."}
])