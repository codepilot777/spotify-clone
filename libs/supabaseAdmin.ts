import Stripe from "stripe";
import { createClient } from '@supabase/supabase-js';

import { Database } from "@/types_db";
import { Price, Product } from "@/types";

import { stripe } from "./stripe";
import { toDatetime } from "./helpers";

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? undefined,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };
  const { error } = await supabaseAdmin
  .from('products')
  .upsert([productData]);
  if (error) {
    throw error;
  }

  console.log(`product inserted and updated successfully with ${product.id}`);
}

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product: '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata,
  }

  const { error } = await supabaseAdmin
  .from('price')
  .upsert([priceData])
  if (error) {
    throw error;
  }

  console.log(`price inserted/updated, ${priceData.id}`)

}

const createOrRetrieveACustomer = async ({
  email,
  uuid
}: {
  email: string,
  uuid: string
}) => {
  const { data, error } = await supabaseAdmin
  .from('customers')
  .select('striped_customer_id')
  .eq('id', uuid)
  .single();

  if (error || !data?.striped_customer_id) {
    const customerData: {
      metadata: {
        supabaseUUID: string 
      };
      email?: string
    } = { metadata: {
      supabaseUUID: uuid,
    }
  }
  if (email) customerData.email = email;
  const customer = await stripe.customers.create(customerData);
  const { error: supabaseError } = await supabaseAdmin
    .from('customers')
    .insert({ id: uuid, stripe_customer_id: customer.id})

  if (supabaseError) {
    throw supabaseError;
  }
  console.log(`New customer created and inserted for ${uuid}`);
  return customer.id
  }
  return data.striped_customer_id;
}

const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) {
    
  }
}