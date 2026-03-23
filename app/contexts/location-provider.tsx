import { useQuery } from "@tanstack/react-query";

interface LocationProps {
    ip: string;
    city: {
        name: string;
        postalCode: string;
    },
    country: {
        name: string;
        timezone: string;
        emojiFlag: string;
    };
}

interface LastVisitsProps { id: number, ip: string, city: string, country: string, flag: string, created_at: Date | string }

const getLocation = async () => {
    try {
        const response = await fetch("https://solid-geolocation.vercel.app/location");
        if (!response.ok) throw new Error("Error al obtener el fetch");
        return await response.json() as LocationProps;
    } catch (error) {
        throw error;
    }
}

const getLastVisit = async () => {
    try {
        const response = await fetch("/api/visits");
        if (!response.ok) throw new Error("Error en el fetch getLastVisits");
        return await response.json() as LastVisitsProps;
    } catch (error) {
        throw error;
    }
}

export const useLocation = () => {
    return useQuery({
        queryKey: ['location'],
        queryFn: getLocation,
        staleTime: 1000 * 60 * 5
    })
}

export const useLastVisit = () => {
    return useQuery({
        queryKey: ['lastVisit'],
        queryFn: getLastVisit,
        staleTime: 1000 * 60 * 5
    })
}