<script setup>
const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  responseType: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col">
    <span v-if="props.responseType === 'array'" class="font-bold text-gray-700 dark:text-gray-300">array of:</span>

    <div v-if="props.schema" class="flex flex-col pl-3 border-l-2 border-gray-200 dark:border-gray-800 border-l-solid">
      <div v-for="(property, name) in props.schema.properties" :key="name" class="flex flex-col text-sm">
        <div class="flex flex-row space-x-4 text-sm">
          <span class="font-bold">{{ name }}</span>
          <span class="text-gray-600 dark:text-gray-400">{{ property?.type }}</span>
          <span class="flex-grow" />
          <span class="text-red-800 dark:text-red-200">{{ props.schema.required && props.schema.required.includes(name) ? 'required' : '' }}</span>
        </div>

        <ResponseBody v-if="property?.type === 'array'" :schema="property" :response-type="property.type" class="pl-4" />
      </div>
    </div>
  </div>
</template>
