declare module 'supercluster' {
  interface Options {
    radius?: number;
    maxZoom?: number;
    minZoom?: number;
    extent?: number;
    nodeSize?: number;
  }

  interface Feature {
    type: 'Feature';
    properties: any;
    geometry: { type: 'Point'; coordinates: [number, number] };
  }

  class Supercluster {
    constructor(options?: Options);
    load(points: Feature[]): void;
    getClusters(bbox: [number, number, number, number], zoom: number): any[];
    getClusterExpansionZoom(clusterId: number): number;
  }

  export default Supercluster;
}
