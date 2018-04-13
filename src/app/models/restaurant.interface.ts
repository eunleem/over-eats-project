export interface Restaurants {
    count: number; // id
    next: string;
    previous: null;
    search_params: {
        lat: string;
        lng: string;
        radius: string;
    };
    restaurants: [
        {
            uuid: string;
            title: string;
            r_status: string;
            r_visible: string;
            schedule_order: boolean;
            rating: string;
            address: {
                address1: string;
                apt_suite: string;
                city: string;
                country: string;
                postal_code: string;
                region: string;
                formatted_address: string;
            },
            position: {
                latitude: number;
                longtitude: number;
                distance: number;
            },
            eta_range: {
                min: number;
                max: number;
            },
            tags: [
                {
                uuid: string;
                name: string;
                    logo_url: string;
                }],
            logo: string;
            logos: [{
                id: number;
                url: string;
                width: number;
                height: number;
                is_default: boolean;
                restaurant: string;
            }],
            open_time: [
                {
                    day_of_week: string;
                    day_of_week_display: string;
                    start_time: number;
                    end_time: number;
                }],
            contact: [
            string
        ];
    }];
}
