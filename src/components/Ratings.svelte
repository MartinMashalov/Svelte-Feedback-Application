<script>
    import {createEventDispatcher} from 'svelte'
    let selected = 10
    const dispatch = createEventDispatcher()
    const on_change = (e) => {
        selected = e.currentTarget.value
        dispatch("ratings_dispatcher", selected)
    }
</script>

<!--create the list of selected ratings-->
<ul class='ratings'>
    <li>
        <input type='radio' id="select1" name="ratings" value="1" on:change={on_change} checked={selected==1}/>
        <label for="select1">1</label>
    </li>
    <li>
        <input type='radio' id="select2" name="ratings" value="2" on:change={on_change} checked={selected==2}/>
        <label for="select2">2</label>
    </li>
    <li>
        <input type='radio' id="select3" name="ratings" value="3" on:change={on_change} checked={selected==3}/>
        <label for="select3">3</label>
    </li>
    <li>
        <input type='radio' id="select4" name="ratings" value="4" on:change={on_change} checked={selected==4}/>
        <label for="select4">4</label>
    </li>
    <li>
        <input type='radio' id="select5" name="ratings" value="5" on:change={on_change} checked={selected==5}/>
        <label for="select5">5</label>
    </li>
    <li>
        <input type='radio' id="select6" name="ratings" value="6" on:change={on_change} checked={selected==6}/>
        <label for="select6">6</label>
    </li>
    <li>
        <input type='radio' id="select7" name="ratings" value="7" on:change={on_change} checked={selected==7}/>
        <label for="select7">7</label>
    </li>
    <li>
        <input type='radio' id="select8" name="ratings" value="8" on:change={on_change} checked={selected==8}/>
        <label for="select8">8</label>
    </li>
    <li>
        <input type='radio' id="select9" name="ratings" value="9" on:change={on_change} checked={selected==9}/>
        <label for="select9">9</label>
    </li>
    <li>
        <input type='radio' id="select10" name="ratings" value="10" on:change={on_change} checked={selected==10}/>
        <label for="select10">10</label>
    </li>
</ul>

<style>
    .ratings {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 30px 0;
    }
    .ratings li {
      position: relative;
      background: #f4f4f4;
      width: 50px;
      height: 50px;
      padding: 10px;
      text-align: center;
      border-radius: 50%;
      font-size: 19px;
      border: 1px #eee solid;
      transition: 0.3s;
    }
    .ratings li label {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      padding: 10px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
    .ratings li:hover {
      background: #ff6a95;
      color: #fff;
    }
    /* Make actual radio select invisible */
    [type='radio'] {
      opacity: 0;
    }
    /* Use the sibling select */
    [type='radio']:checked ~ label {
      background: #ff6a95;
      color: #fff;
    }
  </style>