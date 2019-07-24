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

get '/fuel_system' do
  erb :fuel, :layout => :application
end

get '/power' do
  erb :power, :layout => :application
end

get '/piston_speed' do
  erb :piston_speed, :layout => :application
end
