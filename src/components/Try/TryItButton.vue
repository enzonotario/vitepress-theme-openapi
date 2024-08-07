<script setup>
import { ref } from 'vue'
import { useOpenapi } from 'vitepress-theme-openapi/composables/useOpenapi'
import { Button } from 'vitepress-theme-openapi/components/ui/button'

const props = defineProps({
  operationId: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  requestUrl: {
    type: String,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits([
  'response',
  'loading',
])

const openapi = useOpenapi()

const operationPath = openapi.getOperationPath(props.operationId)

const baseUrl = openapi.getBaseUrl()

const defaultRequestUrl = `${baseUrl}${operationPath}`

const response = ref(null)

const responseTime = ref(null)

const loading = ref(false)

async function tryIt() {
  trackTryIt()
  const start = performance.now()

  try {
    responseTime.value = null
    response.value = '{}'
    setLoading(true)

    const data = await fetch(props.requestUrl ?? defaultRequestUrl, {
      method: props.method.toUpperCase(),
    })

    response.value = await data.json()
  }
  catch (error) {
    response.value = error
  }
  finally {
    setLoading(false)
    const end = performance.now()
    responseTime.value = (end - start).toFixed(2)

    emits('response', response.value)
  }
}

function trackTryIt() {
  try {
    window.gtag('event', 'try_it', {
      event_category: 'api',
      event_label: props.operationId,
    })
  }
  catch (error) { }
}

function setLoading(value) {
  loading.value = value
  emits('loading', value)
}
</script>

<template>
  <div class="flex flex-col space-y-4">
    <Button @click="tryIt">
      {{ $t('Try it out') }}
    </Button>

    <div v-if="response || loading" class="flex flex-col">
      <details class="flex flex-col" open>
        <summary class="my-0! text-lg font-bold cursor-pointer">
          {{ loading ? $t('Loading...') : $t('Response') }}
        </summary>

        <div v-if="response" class="text-sm text-gray-500">
          {{ $t('Response time') }}: {{ loading ? $t('Loading...') : `${responseTime}ms` }}
        </div>

        <div class="flex flex-col max-h-96 overflow-y-auto">
          <slot name="response" :response="response" :is-dark="props.isDark" />
        </div>
      </details>
    </div>
  </div>
</template>
