"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from '@/components/ui/separator'
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    title: z.string().min(3).max(20),
    description: z.string().min(10).max(500).trim(),
    image: z.string().url(),
})
const CollectionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
            description: "",
            image: "",
        },
      })

      const onSubmit=async(values: z.infer<typeof formSchema>)=> {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <div className='p-10'>
        <p className='text-heading2-bold'>Create Collection</p>
        <Separator className='my-4 bg-grey-1 mb-7'/>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />      
        <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description" {...field} rows={5}/>
            </FormControl>
        
            <FormMessage />
          </FormItem>
          
        )}
      />
              <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
            
            </FormControl>
       
          </FormItem>
          
        )}
      />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default CollectionForm