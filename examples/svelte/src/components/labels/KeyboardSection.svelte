<script lang="ts">
  import { keyboard } from '@manapotion/svelte'

  import Item from '../Item.svelte'
  import Label from '../Label.svelte'

  let codes = ''
  let keys = ''

  $: codes = Array.from(Object.keys($keyboard.codes)).reduce(
    (acc, code) => `${acc}${acc && ','} ${code}`,
    '',
  )

  $: keys = Array.from(Object.keys($keyboard.keys)).reduce(
    (acc, key) => `${acc}${acc && ','} ${key}`,
    '',
  )
</script>

<Item name="codes">
  <span slot="value">{codes}</span>
</Item>

<Item name="keys">
  <span slot="value">{keys}</span>
</Item>

<Item name="ctrl">
  <Label slot="label" name="ctrl" value={$keyboard.ctrl} />
</Item>

<Item name="shift">
  <Label slot="label" name="shift" value={$keyboard.shift} />
</Item>

<Item name="alt">
  <Label slot="label" name="alt" value={$keyboard.alt} />
</Item>

<Item name="meta">
  <Label slot="label" name="meta" value={$keyboard.meta} />
</Item>
