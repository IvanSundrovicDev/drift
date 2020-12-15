<template>
  <div class="flex h-full">
    <gmap-map
      :center="center"
      :zoom="12"
      class="h-full w-full"
      map-type-id="satellite"
    >
      <gmap-polygon
        :paths="paths"
        :editable="true"
        @paths_changed="updateEdited($event)"
      >
      </gmap-polygon>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 1.38, lng: 103.8 },
      edited: null,
      paths: [
        [
          { lat: 1.38, lng: 103.8 },
          { lat: 1.38, lng: 103.81 },
          { lat: 1.39, lng: 103.81 },
          { lat: 1.39, lng: 103.8 }
        ],
        [
          { lat: 1.382, lng: 103.802 },
          { lat: 1.382, lng: 103.808 },
          { lat: 1.388, lng: 103.808 },
          { lat: 1.388, lng: 103.802 }
        ]
      ]
    };
  },
  methods: {
    updateEdited(mvcArray) {
      let paths = [];
      for (let i = 0; i < mvcArray.getLength(); i++) {
        let path = [];
        for (let j = 0; j < mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }
      this.edited = paths;
    }
  }
};
</script>
