export interface Component {
  long_name: string;
  short_name: string;
  types: any[];
}
export interface Address {
  name: string;
  place_id: string;
  vincinity: string;
  address_components: Component[];
}
export interface SearchResult {
  search_text: string;
  result: Address[];
}
