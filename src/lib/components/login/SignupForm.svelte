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
let confirmPassword = '';

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
    <FormTitle>Sign up</FormTitle>
    <FormInput bind:value={username} type="text" placeholder="Username" required />
    <FormInput bind:value={password} type="password" placeholder="Password" required />
    <FormInput bind:value={confirmPassword} type="password" placeholder="Confirm password" required />
    <FormButton type="submit" on:click={handleClick}>Sign up</FormButton>
  </Form>
</Modal>