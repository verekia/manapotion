<script lang="ts">
  export let name: string
  export let value: boolean

  console.log(`Label ${name} rendered`)

  $: labelClass =
    value === true ? 'label--positive' : value === false ? 'label--negative' : 'label--unknown'
  $: labelText = value === true ? 'Yes' : value === false ? 'No' : 'Unknown'
</script>

<span class="label {labelClass}">
  {labelText}
</span>
