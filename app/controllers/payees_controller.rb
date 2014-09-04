class PayeesController < ApplicationController
  def index
    @payees = Payee.all
    render :json => @payees
  end
  
  def create
    @payee = Payee.new(payee_params)
   
    if @payee.save
      render :json => @payee
    else
      render :json => @payee.errors, :status => :unprocessable_entity
    end
  end
  
  private
  def payee_params
    params.require(:payee).permit(:name, :address)
  end
end
