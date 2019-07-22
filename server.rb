require 'sinatra'

get '/' do
  erb :home, :layout => :application
end

get '/displacement' do
  erb :displacement, :layout => :application
end

get '/comp_ratio' do
  erb :comp_ratio, :layout => :application
end

get '/fuel' do
  erb :fuel, :layout => :application
end
