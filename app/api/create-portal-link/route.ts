import { createRouteHandlerClinet } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/libs/stripe';
import { getUrl } from '@/libs/helpers';
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';

export async function POST() {
    try {
        const supabase = createRouteHandlerClinet({
            cookies
        })

        const { data: { user }} = await supabase.auth.getUser();

        if (!user) throw new Error('Could not get the user')

        const customer = await createOrRetrieveCustomer({
            uuid: user.id || '',
            email: user.email || ''
        })

        if (!customer) throw new Error('Could not get the customer');
        
        const { url } = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getUrl()}/account`
        });

        return NextResponse.json({ url });
    } catch (error: any) {
        console.log(error)
        return new NextResponse('Interal Error', { status: 500 })

    }
}