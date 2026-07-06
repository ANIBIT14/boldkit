<script setup lang="ts">
/**
 * BoldKit <ChartToolbar> — brutalist chart export overlay (Vue adapter).
 * Mirrors the React <ChartToolbar>. Wraps a chart and overlays PNG / SVG /
 * CSV / fullscreen actions. Works with any chart rendering a <canvas>
 * (ECharts) or <svg> into the wrapped container.
 *
 * SVG export is off by default because ECharts renders to <canvas>; enable
 * it only when using an SVG-renderer chart.
 */
import { ref } from 'vue'
import { Download, Image, FileText, Maximize } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import Button from './Button.vue'
import { downloadCSV, exportPNG, exportSVG, toggleFullscreen } from '@/lib/chart-export'

const props = withDefaults(
  defineProps<{
    class?: string
    /** Rows fed to the chart — enables the CSV button when provided. */
    data?: Array<Record<string, unknown>>
    /** Base filename (no extension) for exports. Default 'chart'. */
    filename?: string
    /** Show the PNG export button. Default true. */
    png?: boolean
    /** Show the SVG export button. Default false (ECharts is canvas-based). */
    svg?: boolean
    /** Show the fullscreen toggle. Default true. */
    fullscreen?: boolean
  }>(),
  { filename: 'chart', png: true, svg: false, fullscreen: true }
)

const container = ref<HTMLElement | null>(null)

const onPng = () => container.value && void exportPNG(container.value, `${props.filename}.png`)
const onSvg = () => container.value && exportSVG(container.value, `${props.filename}.svg`)
const onCsv = () => props.data && downloadCSV(props.data, `${props.filename}.csv`)
const onFullscreen = () => container.value && toggleFullscreen(container.value)
</script>

<template>
  <div ref="container" :class="cn('relative', $props.class)">
    <div class="absolute right-2 top-2 z-10 flex gap-1">
      <Button
        v-if="png"
        type="button"
        variant="outline"
        size="icon"
        class="h-8 w-8"
        aria-label="Export chart as PNG"
        title="Export PNG"
        @click="onPng"
      >
        <Image />
      </Button>
      <Button
        v-if="svg"
        type="button"
        variant="outline"
        size="icon"
        class="h-8 w-8"
        aria-label="Export chart as SVG"
        title="Export SVG"
        @click="onSvg"
      >
        <Download />
      </Button>
      <Button
        v-if="data && data.length > 0"
        type="button"
        variant="outline"
        size="icon"
        class="h-8 w-8"
        aria-label="Download chart data as CSV"
        title="Download CSV"
        @click="onCsv"
      >
        <FileText />
      </Button>
      <Button
        v-if="fullscreen"
        type="button"
        variant="outline"
        size="icon"
        class="h-8 w-8"
        aria-label="Toggle fullscreen"
        title="Fullscreen"
        @click="onFullscreen"
      >
        <Maximize />
      </Button>
    </div>
    <slot />
  </div>
</template>
