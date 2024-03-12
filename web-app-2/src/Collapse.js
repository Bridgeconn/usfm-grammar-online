import React ,{useEffect, useState} from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export default function Collapse({msg}) {
    const [message, setMessage] = useState("")
    useEffect(()=>{
setMessage(msg);
    },[msg])
  return (
    <div className="w-full px-4  ">
      <div className="mx-auto w-full  rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500/75">
                <span>Message</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-sky-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
             {message}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
            </div>
    </div>
  )
}
