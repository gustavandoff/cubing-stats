<script lang="ts">
import Form from "../Form/Form.svelte";
import FormTitle from "../Form/FormTitle.svelte";
import FormInput from "../Form/FormInput.svelte";
import FormButton from "../Form/FormButton.svelte";

import Modal from "../Modal.svelte";

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

let username = '';
let password = '';

function handleClose() {
  dispatch('close');
}

function handleClick() {
  console.log('clicked');
  console.log('username:', username);
  console.log('password:', password);
}

</script>

<Modal on:close={handleClose}>
  <Form>
    <FormTitle>Login</FormTitle>
    <FormInput bind:value={username} type="text" placeholder="Username" required />
    <FormInput bind:value={password} type="password" placeholder="Password" required />
    <FormButton type="submit" on:click={handleClick}>Login</FormButton>
  </Form>
</Modal>