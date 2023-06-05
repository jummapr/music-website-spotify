'use client'

import qs from 'query-string'

import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Input from './Input';

interface SearchInputProps {

}

const SearchInput: FC<SearchInputProps> = ({ }) => {

    const router = useRouter();
    const [value, setValue] = useState<string>("");

    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,

        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query,
        });

        router.push(url);
    }, [debouncedValue, router])


    return (
        <Input
            placeholder='what do you want to listen to?'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default SearchInput